// @ts-nocheck
import { assign, createMachine } from "xstate";
import { toast } from "react-toastify";

interface Context {
  amount1: number;
  amount2: number;
  calculated: number;
}

type Event =
  | { type: "RESOLVE" }
  | { type: "A1_UPDATE"; value: string }
  | { type: "A2_UPDATE"; value: string }
  | { type: "PROCESS" };

export const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QDMD2AnAtgOgDaoEMIBLAOygGIJVSxsyA3VAazvyIBECAXAgbQAMAXUSgADqljFuxGqJAAPRACYAzAA5sATgCMAnQFYAbMoMAaEAE9EAWgMB2bABYBJgwF93FtFmzowRJYUAII6APoAqgAKHMEAKgCigiJIIBJSMnKpSgiqetjq9uparqYW1ghOqlrYBgbKAuqqzS3Nnt4YOP6BIcqRMfFJwvLp0rKk8jnKyppNDXllVirqBtj29o2tW+0gPl0BEEFRAEoA8gDCCQDKV8kjkmNZoDk6r87q6jM6ixWvjiaqKr2DxeXadbBidCoADGcCk5CoNDojBYdEhMLhd1So0yE2ythMtVUpnqm1aTnKiFUBhqWicRmpTh0RhZrJBoNIqAgcHke3uGXGk1sOlUAmwIqM9h0hXMSwQNh0TkcOnsWkl0yZyj0dJ2ezwhBI5H5jzxzwJymczRpqmBlPlNOwkrV9g1321Tl14O6h2NuKFCCdzhKHwMTNZLLtyi0qjWTiVunDrNUnt86NhsHhUF9gvx8s+4tUkultrlhjFVS2lY9nncQA */
  createMachine({
    schema: {
      context: {} as Context,
      events: {} as Event,
    },
    id: "form",
    tsTypes: {} as import("./formState.machine.typegen").Typegen0,
    initial: "loading",
    context: {
      amount1: 0,
      amount2: 0,
      calculated: 0,
    },
    states: {
      loading: {
        invoke: {
          id: "loadData",
          src: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({ amount1: 10, amount2: 20 });
              }, 10000);
            });
          },
          onDone: {
            target: "ready",
            actions: assign((_, event) => ({
              amount1: event.data.amount1,
              amount2: event.data.amount2,
            })),
          },
        },
      },
      ready: {
        on: {
          A1_UPDATE: {
            actions: assign((_, event) => ({
              amount1: Number(event.value),
            })),
          },
          A2_UPDATE: {
            actions: assign((_, event) => ({
              amount2: Number(event.value),
            })),
          },
          PROCESS: "processing",
        },
      },
      processing: {
        entry: () => {
          toast("Processing...", { autoClose: 10000 });
        },
        invoke: {
          id: "process",
          src: (context) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({ amount1: context.amount1, amount2: context.amount2 });
              }, 2000);
            });
          },
          onDone: {
            target: "ready",
            actions: assign((_, event) => ({
              calculated: event.data.amount1 + event.data.amount2,
            })),
          },
        },
      },
    },
  });
