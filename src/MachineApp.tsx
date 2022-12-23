// @ts-nocheck
import { useMachine } from "@xstate/react";
import { machine } from "./machines/formState.machine";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MachineApp() {
  const [current, send] = useMachine(machine);
  const { amount1, amount2, calculated } = current.context;
  const isLoading = current.matches("loading");

  const onAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    send({
      type: "A1_UPDATE",
      value: e.target.value,
    });
  };

  const onAmount2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    send({
      type: "A2_UPDATE",
      value: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send("PROCESS");
  };

  return (
    <div className="flex justify-center align-middle">
      <ToastContainer />
      <div className="bg-cyan-900 text-cyan-50 mt-64 w-1/3 shadow">
        <div className="text-center pt-2">
          {isLoading ? <>Loading...</> : <>Ready</>}
        </div>
        <form className="p-10" onSubmit={onSubmit}>
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
              onChange={onAmount1Change}
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
              onChange={onAmount2Change}
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
      </div>
    </div>
  );
}

export default MachineApp;
