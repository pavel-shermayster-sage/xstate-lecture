import { useEffect, useState } from "react";
import { useMachine } from "@xstate/react";
import { machine } from "./machines/formState.machine";

function MachineApp() {
  // @ts-ignore
  const [current, send] = useMachine(machine);
  const { amount1, amount2, calculated } = current.context;

  return (
    <div className="flex justify-center align-middle">
      <div className="bg-cyan-900 text-cyan-50 mt-64 w-1/3 shadow">
        {current.matches("loading") && (
          <div className="text-center p-10">Loading...</div>
        )}
        {["ready", "processing"].some(current.matches) && (
          <form
            className="p-10"
            onSubmit={(e) => {
              e.preventDefault();
              send("PROCESS");
            }}
          >
            <div className="flex flex-col justify-center gap-1">
              <label className="uppercase" htmlFor="amount1">
                amount 1:
              </label>
              <input
                className="p-2 text-cyan-900"
                type="number"
                name="amount1"
                id="amount1"
                value={amount1}
                onChange={(e) => {
                  send({
                    type: "A1_UPDATE",
                    value: Number(e.target.value),
                  });
                }}
              />
            </div>
            <div className="flex flex-col justify-center gap-1 mt-2">
              <label className="uppercase" htmlFor="amount2">
                amount 2:
              </label>
              <input
                className="p-2 text-cyan-900"
                type="number"
                name="amount2"
                id="amount2"
                value={amount2}
                onChange={(e) => {
                  send({
                    type: "A2_UPDATE",
                    value: Number(e.target.value),
                  });
                }}
              />
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-cyan-50 text-cyan-900 p-2 mt-2 rounded">
                {current.matches("processing") ? "Processing" : "Submit"}
              </button>
            </div>
            <div className="flex flex-col justify-center gap-1 mt-2">
              <label className="uppercase" htmlFor="amount2">
                calculated:
              </label>
              <input
                readOnly={true}
                className="p-2 text-cyan-900"
                type="number"
                name="calculated"
                id="calculated"
                value={calculated}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default MachineApp;
