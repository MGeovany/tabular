"use client";

import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <div className="bg-paper text-ink min-h-screen font-mono">
      <div className="border-ink mx-auto my-8 flex min-h-screen max-w-[720px] flex-col border-[3px]">
        <header className="border-ink flex h-14 items-center border-b-[3px] px-6">
          <Link
            href="/"
            className="border-ink hover:bg-ink hover:text-paper -ml-2 rounded px-2 py-1 text-sm font-bold uppercase transition-colors"
          >
            ← Back
          </Link>
        </header>

        <main className="flex-1 p-6 pb-12">
          <h1 className="font-dela mb-8 text-2xl font-black tracking-tight uppercase md:text-3xl">
            Refund Policy
          </h1>
          <p className="mb-6 text-sm opacity-90">Last updated: February 2026</p>

          <div className="flex flex-col gap-8 text-sm leading-relaxed">
            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">1. Refund window</h2>
              <p className="opacity-90">
                You may request a full refund within <strong>14 days</strong> of the date of
                purchase. Refund requests must be submitted within this 14-day period to be
                eligible.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">2. How to request</h2>
              <p className="opacity-90">
                To request a refund, email{" "}
                <a className="underline hover:opacity-80" href="mailto:support@thefndrs.com">
                  support@thefndrs.com
                </a>{" "}
                with your account email, the date of purchase, and your order or transaction
                reference if available. We will process eligible requests in line with this
                policy.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">3. Chargebacks</h2>
              <p className="opacity-90">
                If you believe a charge is unauthorized, contact us as soon as possible.
                Initiating a chargeback may result in suspension of access while the dispute is
                reviewed.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">4. Regional rights</h2>
              <p className="opacity-90">
                If you are located in a jurisdiction that provides mandatory consumer rights (for
                example, EU/UK withdrawal rights), those rights may apply and are not limited by
                this policy.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">5. Changes</h2>
              <p className="opacity-90">
                We may update this policy from time to time. We will post the revised version
                here and update the &quot;Last updated&quot; date.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
