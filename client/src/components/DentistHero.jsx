import { CtaButton, Logo } from "@/components";
import { size } from "@/lib/mediaQuerys";
import styled, { keyframes } from "styled-components";

const dropUp = keyframes`
  0% {
    transform: translateY(100%); // Start off-screen above
    opacity: 0;
  }
  100% {
    transform: translateY(0); // Move into place
    opacity: 1;
  }
`;
const HeroSection = styled.section`
    background-image: url("/backs/dentist-landing-1.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    /* background-attachment: fixed; */
    position: relative;
    display: flex;
    justify-content: center;
`
const HeroHeading = styled.h1`
  background-color: white;
  text-transform: uppercase;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-text-fill-color: transparent;
  background-image: url("/backs/heading-texture_1heading-texture.webp");
  background-clip: text;
  /* margin-top: 7rem; */
  font-size: 3rem;
  font-weight: 600;
  line-height: 1;
@media screen and (max-width: 991px) {
    font-size: 2.8rem;
    margin-top: 1rem;

  }
`
const Content = styled.div`
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -2rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  gap: 10px;
  animation: ${dropUp} 0.5s ease-out forwards;
  opacity: 1;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1);

  @media screen and (max-width: ${size.laptop}) {
    margin-left: 40px;
    margin-right: 40px;
  }
  @media screen and (max-width: ${size.tablet}) {
    margin-top: 2rem;
    margin-left: 0;
    margin-right: 0;
  }
`;
const VideoWrapper = styled.div`
  aspect-ratio: 600 / 338;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 75%;
    max-width: 67rem;
    margin-top: 2rem;
    margin-bottom: 2.3rem;
    position: relative;
    box-shadow: 0 0 0 3px var(--gold), 0 0 0 8px #ffffff3d;
    @media screen and (max-width: ${size.laptopL}) {
      width: 72%;
    }
    @media screen and (max-width: ${size.laptop}) {
      width: 100%;
    }
    @media screen and (max-width: ${size.tablet}) {
      box-shadow: none;
        margin-top: .5rem;
        margin-bottom: .5rem;
    }
`
const SubParagraph = styled.h2` // Use Link instead of button
    color: var(--gray);
    text-align: center;
    text-transform: none;
    -webkit-text-fill-color: inherit;
    background-image: none;
    background-clip: border-box;
    margin-bottom: 0;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1;
    
    @media screen and(max-width: ${size.laptopL}) {
      font-size: 1.6rem;
    }
    @media screen and(max-width: ${size.laptop}) {
      font-size: 1.2rem;
    }
`;

// eslint-disable-next-line react/prop-types
export default function DentistHero({title,description}) {
  return (
    <HeroSection>
      <div className="relative container-large  w-full max-w-7xl">
        <div className="padding-section-medium">
          <Content>
            <Logo/>
            <HeroHeading>{title}</HeroHeading>
            <SubParagraph>{description}</SubParagraph>

            <VideoWrapper>
                <div className=" aspect-video relative">
                <iframe
                  className="border-none absolute top-0 left-0 w-full h-full"
                  src="https://player.vimeo.com/video/1017741123?h=dc0d9f5e14&autoplay=1&muted=1&loop=1"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                ></iframe>

                </div>
            </VideoWrapper>
            <CtaButton withSubscribers='true'/>
          </Content>
        </div>
      </div>
    </HeroSection>
  )
}
