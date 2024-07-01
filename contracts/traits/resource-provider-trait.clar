(define-trait resource-provider-trait
  (
    ;; Return resource - if payment has been made. Otherwise initiate 402 payment flow
		;;(get-resource (uint) (response bool uint))
    (add-resource ((string-utf8 50) (string-utf8 255) uint) (response uint uint))
    (toggle-resource (uint) (response bool uint))
    (toggle-resource-by-name ((string-utf8 50)) (response bool uint))
  )
)