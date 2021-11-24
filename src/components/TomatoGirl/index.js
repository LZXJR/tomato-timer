import s from "./style.module.css";
import tomatoGirlImg from "../../img/tomatoGirl.webp";

export const TomatoGirl = () => (
  <div className={s.tomato_img}>
    <img src={tomatoGirlImg} alt="tomato" className={s.tomato_girl} />
  </div>
);
