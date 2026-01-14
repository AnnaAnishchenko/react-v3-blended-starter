import { BarLoader } from "react-spinners";
import style from "./Loader.module.css";

export default function Loader() {
  return <div className={style.backdrop}>{<BarLoader />}</div>;
}
