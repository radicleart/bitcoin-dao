(define-trait payment-gateway-trait
  (
    ;;(check-payment (principal uint) (response bool int))
    ;;(make-payment (uint (optional (buff 34))) (response bool uint))
    (pay-invoice (uint (optional (buff 34))) (response uint uint))
    (pay-invoice-by-resource-name ((string-utf8 50) (optional (buff 34))) (response uint uint))
  )
)