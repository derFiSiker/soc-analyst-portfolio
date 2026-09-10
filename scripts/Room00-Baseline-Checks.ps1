[CmdletBinding()]
param(
    [ValidateSet('DC-01','ALICE-01')]
    [string]$Role = 'DC-01',
    [string]$WazuhAddress = '192.168.42.20'
)

# Room 00 Abkürzung: read-only baseline collection.
# This script does not change network settings, services, accounts, firewall rules, or files.
$ErrorActionPreference = 'Continue'
$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$output = Join-Path $PWD "room00-$($Role.ToLower())-$timestamp.txt"

@(
"Room 00 read-only baseline"
"Role: $Role"
"Timestamp: $(Get-Date -Format o)"
"=== Computer ==="
(Get-CimInstance Win32_ComputerSystem | Select-Object Name,Domain,PartOfDomain | Format-List | Out-String).Trim()
"=== Network ==="
(Get-NetIPConfiguration | Format-List InterfaceAlias,IPv4Address,IPv4DefaultGateway,DNSServer | Out-String).Trim()
"=== Adapter ==="
(Get-NetAdapter | Format-Table Name,Status,LinkSpeed,MacAddress -AutoSize | Out-String).Trim()
"=== Wazuh service ==="
(sc.exe query WazuhSvc 2>&1 | Out-String).Trim()
"=== Dashboard HTTP reachability ==="
(curl.exe -k --connect-timeout 5 -I "https://$WazuhAddress" 2>&1 | Select-Object -First 12 | Out-String).Trim()
"=== Time ==="
(w32tm /query /status 2>&1 | Out-String).Trim()
"=== End ==="
) | Tee-Object -FilePath $output

Write-Host "Saved read-only report: $output"
