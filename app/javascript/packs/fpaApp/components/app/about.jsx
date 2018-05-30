import React from "react";
import { Button, Jumbotron } from "react-bootstrap";

class About extends React.Component {
  render() {
    return (
      <Jumbotron>
        <h1 style={{ textAlign: "center" }}>About Fantasy Punt Analyzer</h1>
        <p>
          This website was built by Koi Stephanos. Koi Stephanos is a software
          engineer specializing in full-stack web development, and is an avid
          basketball fan. Playing fantasy basketball and regularly implementing
          punting based strategies, he found himself wanting a way to rank and
          compare players without specific statistical categories. Having not
          found such a service readily available, he chose to create one.
        </p>
        <h3 style={{ textAlign: "center" }}>What is Punting?</h3>
        <p>
          Punting is the stragey in which the owner of a fantasy basketball team
          drafts/builds his team around a particular deficiency as opposed to
          general strenghts. By collecting players who all excell in and are
          poor at the same things makes for a more competitive fantasy team. For
          example: drafting a team of centers that can't shoot free throws or
          threes makes you weak in two categories, but particularly stronger
          everywhere else, and considering you only have to win a certain number
          of categories to take a week, you are better off specializing.
        </p>
        <h3 style={{ textAlign: "center" }}>How it Works</h3>
        <p>
          All player data is pulled directly from the Yahoo! Sports server, so
          it is updated regularly, and specific to the league you are playing
          in. Yahoo uses a z-Score strategy to rank players. Basically, this is
          just a number that indicates how above or below average a player is at
          a particular skill. For example, Westbrook has an insanely hight
          z-Score for triple doubles, he simply gets so many more than the
          average player. On the other hand, Dwight Howard has a very low
          z-Score for free throw percentage. By averaging all these scores
          together, we can compare players accross multiple skills within
          relation to eachother. Fantasy Punt Analyzer follows the same
          guidlines, while also providing filtering. One other thing to note is
          that Fantasy Punt Analyzer also uses field goal/free throw impact
          (FGI/FTI) instead of the base percentages when ranking players in
          order to account for shot volume.
        </p>
        <h3 style={{ textAlign: "center" }}>Contact Me</h3>
        <div style={{ textAlign: "center" }}>
          <Button
            bsStyle="primary"
            bsSize="large"
            href="mailto:dkstephanos@gmail.com"
          >
            dkstephanos@gmail.com
          </Button>
          <div style={{ paddingTop: "1%" }} class="socialbar">
            <Button
              bsStyle="primary"
              bsSize="large"
              href="https://stephanossolutions.com/portfolio"
              title="Portfolio"
              target="_blank"
            >
              <i class="fas fa-portrait" />
            </Button>
            <Button
              bsStyle="primary"
              bsSize="large"
              href="https://www.linkedin.com/in/dkstephanos/"
              title="Linkedin"
              target="_blank"
            >
              <i class="fab fa-linkedin" />
            </Button>
            <Button
              bsStyle="primary"
              bsSize="large"
              href="https://github.com/dkStephanos"
              title="Github"
              target="_blank"
            >
              <i class="fab fa-github" />
            </Button>
            <Button
              bsStyle="primary"
              bsSize="large"
              href="https://www.facebook.com/kstephanos"
              title="Facebook"
              target="_blank"
            >
              <i class="fab fa-facebook-square" />
            </Button>
            <Button
              bsStyle="primary"
              bsSize="large"
              href="https://stephanossolutions.com"
              title="Tech Blog"
              target="_blank"
            >
              <i class="fas fa-universal-access" />
            </Button>
          </div>
          <div style={{ paddingTop: "1%" }}>
            <Button href="/home" bsStyle="primary">
              Back Home
            </Button>
          </div>
        </div>
      </Jumbotron>
    );
  }
}
export default About;
