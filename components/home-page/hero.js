import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/Mohammad.jpg"
          alt="An image showing mohammad"
          width="300"
          height="300"
        />
      </div>
      <h1>Hi, I{`'`}m Mohammad</h1>
      <p>
        I blog about web development - especially frontend framworks like nextjs
        and angular and react.
      </p>
    </section>
  );
}

export default Hero;
