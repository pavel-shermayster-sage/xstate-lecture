import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [calculation, setCalculation] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAmount1(10);
      setAmount2(20);
      setCalculation(30);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flex justify-center align-middle">
      <ToastContainer />
      <div className="bg-cyan-900 text-cyan-50 mt-64 w-1/3 shadow">
        <div className="text-center pt-2">
          {isLoading ? <>Loading...</> : <>Ready</>}
        </div>
        <form
          className="p-10"
          onSubmit={(e) => {
            e.preventDefault();
            setIsProcessing(true);
            toast("Processing...", { autoClose: 2000 });
            setTimeout(() => {
              setCalculation(amount1 + amount2);
              setIsProcessing(false);
            }, 2000);
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
                setAmount1(Number(e.target.value));
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
                setAmount2(Number(e.target.value));
              }}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button className="bg-cyan-50 text-cyan-900 p-2 mt-2 rounded">
              {isProcessing ? "Processing" : "Submit"}
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
              value={calculation}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
