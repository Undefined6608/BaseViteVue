function Use-Node-From-Nvmrc {
    $nvmrcPath = ".nvmrc"

    if (!(Test-Path $nvmrcPath)) {
        Write-Error ".nvmrc not found in current directory."
        return
    }

    $version = (Get-Content $nvmrcPath | Out-String).Trim()
    if (-not $version) {
        Write-Error ".nvmrc is empty or invalid."
        return
    }

    # 设置你的 NVM 路径
    $nvmDir = "C:\Program Files\nvm"
    $nodePath = "$nvmDir\v$version"

    if (!(Test-Path $nodePath)) {
        Write-Host "Node version $version not found. Installing via nvm..."
        nvm install $version
    }

    if (!(Test-Path $nodePath)) {
        Write-Error "❌ Node version $version still not found after install attempt."
        return
    }

    # 修改 PATH，仅影响当前 PowerShell 会话
    $env:PATH = "$nodePath;$nvmDir;" + ($env:PATH -split ";" | Where-Object { $_ -notmatch "nvm" }) -join ";"

    Write-Host "✅ Now using Node.js v$version (session only)" -ForegroundColor Green
    node -v
}

Use-Node-From-Nvmrc
