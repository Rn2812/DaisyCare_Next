# Servidor local do DaisyCare. Em http://localhost o Chrome guarda a permissão do microfone.
param([int]$Port = 8765, [string]$Arquivo = '')
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$sep  = [IO.Path]::DirectorySeparatorChar
if (-not $Arquivo) { $f = Get-ChildItem -Path $root -Filter 'DaisyCare_App_*.html' | Sort-Object LastWriteTime -Descending | Select-Object -First 1; if ($f) { $Arquivo = $f.Name } }
$mime = @{ '.html'='text/html; charset=utf-8'; '.js'='text/javascript'; '.css'='text/css'; '.png'='image/png'; '.jpg'='image/jpeg'; '.svg'='image/svg+xml'; '.mp3'='audio/mpeg'; '.wav'='audio/wav'; '.json'='application/json'; '.ico'='image/x-icon' }
if (-not $Arquivo -or -not (Test-Path (Join-Path $root $Arquivo))) { Write-Host "Arquivo $Arquivo nao encontrado em $root. Coloque o HTML na mesma pasta deste script." -ForegroundColor Red; Read-Host 'Enter para sair'; exit 1 }
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add("http://localhost:$Port/")
try { $l.Start() } catch { Write-Host "Porta $Port em uso. Feche outra janela do servidor ou rode com -Port 8766." -ForegroundColor Red; Read-Host 'Enter para sair'; exit 1 }
$url = "http://localhost:$Port/$Arquivo"
Write-Host "DaisyCare rodando em $url  (feche esta janela para encerrar)" -ForegroundColor Green
try { Start-Process chrome $url } catch { Start-Process $url }
while ($l.IsListening) {
  $c = $l.GetContext()
  try {
    $rel = [Uri]::UnescapeDataString($c.Request.Url.AbsolutePath.TrimStart('/'))
    if (-not $rel) { $rel = $Arquivo }
    $full = [IO.Path]::GetFullPath((Join-Path $root $rel))
    if ($full.StartsWith($root + $sep) -and (Test-Path $full -PathType Leaf)) {
      $bytes = [IO.File]::ReadAllBytes($full)
      $ext = [IO.Path]::GetExtension($full).ToLower()
      $c.Response.ContentType = $(if ($mime[$ext]) { $mime[$ext] } else { 'application/octet-stream' })
      $c.Response.ContentLength64 = $bytes.Length
      $c.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else { $c.Response.StatusCode = 404 }
  } catch { $c.Response.StatusCode = 500 }
  $c.Response.Close()
}
