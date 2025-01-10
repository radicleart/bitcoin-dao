;; Title: BDP021 Opinion Polling
;; Author: Mike Cohen
;; Depends-On: 
;; Synopsis:
;; Enables quick opinion polling functionality.
;; Description:
;; A more streamlined type of voting designed to quickly gauge community opinion.
;; Unlike DAO proposals, opinion polls cannot change the configuration of the DAO.

(impl-trait .proposal-trait.proposal-trait)

(define-public (execute (sender principal))
	(begin
		;; Enable genesis extensions.
		(try! (contract-call? .bitcoin-dao set-extensions
			(list
				{extension: .bde021-opinion-polling, enabled: true}
			)
		))
		(print "Bitcoin DAO opinion polls are enabled.")
		(ok true)
	)
)
