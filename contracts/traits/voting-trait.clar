(use-trait proposal-trait .proposal-trait.proposal-trait)
(define-trait voting-trait
  (
    (add-proposal (<proposal-trait>
                  (tuple 
                    (start-height-stacks uint)
                    (start-burn-height uint)
                    (end-burn-height uint)
                    (custom-majority (optional uint))
                    (proposer principal)))
                  (response bool uint))
  )
)
