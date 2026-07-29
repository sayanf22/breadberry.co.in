import { CheckIcon } from "@/components/icons";
import type { FormState } from "@/app/actions";

export function SuccessPanel({ message }: { message?: string }) {
  return (
    <div
      className="panel-enter rounded-panel border border-green/25 bg-[#f2f9f4] p-[clamp(1.5rem,3vw,2.25rem)]"
      role="status"
    >
      <span className="grid size-12 place-items-center rounded-full bg-green/12 text-green">
        <CheckIcon className="size-6" />
      </span>
      <h2 className="mt-5 font-sans text-[1.125rem] font-semibold leading-snug text-navy">
        Request received
      </h2>
      <p className="mt-2 text-muted">{message}</p>
    </div>
  );
}

export function ErrorSummary({ state }: { state: FormState }) {
  if (state.status !== "error" || !state.message) return null;

  return (
    <p
      role="alert"
      className="rounded-2xl border border-berry/25 bg-[#fdf2f4] px-4 py-3 text-[0.8125rem] font-medium text-berry"
    >
      {state.message}
    </p>
  );
}
