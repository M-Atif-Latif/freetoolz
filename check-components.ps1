$missingHowItWorks = @()
$missingCopyButton = @()

Get-ChildItem -Path 'src\tools' -Filter '*.tsx' -File | ForEach-Object {
  $file = $_
  $content = Get-Content $file.FullName -Raw
  
  if ($content -match 'import HowItWorks' -and $content -notmatch '<HowItWorks') {
    $missingHowItWorks += $file.Name
  }
  if ($content -match 'import CopyButton' -and $content -notmatch '<CopyButton') {
    $missingCopyButton += $file.Name
  }
}

Write-Output '=== Tools Missing HowItWorks Rendering ==='
if ($missingHowItWorks.Count -eq 0) { Write-Output 'None' } else { $missingHowItWorks }

Write-Output ''
Write-Output '=== Tools Missing CopyButton Rendering ==='
if ($missingCopyButton.Count -eq 0) { Write-Output 'None' } else { $missingCopyButton }

Write-Output ''
Write-Output "Total missing HowItWorks: $($missingHowItWorks.Count)"
Write-Output "Total missing CopyButton: $($missingCopyButton.Count)"
