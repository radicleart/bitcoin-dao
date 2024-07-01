(define-trait governance-token-trait
	(
		(bdg-get-balance (principal) (response uint uint))
		(bdg-has-percentage-balance (principal uint) (response bool uint))
		(bdg-transfer (uint principal principal) (response bool uint))
		(bdg-lock (uint principal) (response bool uint))
		(bdg-unlock (uint principal) (response bool uint))
		(bdg-get-locked (principal) (response uint uint))
		(bdg-mint (uint principal) (response bool uint))
		(bdg-burn (uint principal) (response bool uint))
	)
)
