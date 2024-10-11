import styled, { keyframes } from 'styled-components';
import { size } from '@/lib/mediaQuerys';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

// Keyframe for the drop-down animation
const dropDown = keyframes`
  0% {
    transform: translateY(-100%); // Start off-screen above
    opacity: 0;
  }
  100% {
    transform: translateY(0); // Move into place
    opacity: 1;
  }
`;

// Styled components
const Navigation = styled.button`
  opacity: 1;
  z-index: 999;
  padding-top: 1rem;
  position: fixed;
  inset: 0% 0% auto;
  animation: ${dropDown} 0.5s ease-out forwards;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: ${size.tablet}) {
    padding-top: 0;
    position: absolute;
    inset: 0% 0% auto;
  }
`;

const PaddingGlobal = styled.div`
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  position: relative;

  @media screen and (max-width: ${size.tablet}) {
    padding: 0.25rem 1.25rem;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media screen and (max-width: ${size.tablet}) {
    align-items: center;
    height: 100px;
    position: relative;
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  z-index: 999;
  position: relative;

  @media screen and (max-width: ${size.tablet}) {
    justify-content: space-between;
  }
`;

const Boss = styled.a`
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold);
  border: 1px solid black;
  padding: 0.2rem;
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
  cursor: pointer;
  transition: border 0.2s, background-color 0.2s;

  &:hover {
    background-color: #c2c2c22b;
    border: 1px solid #c2c2c2bb;
  }

  @media screen and (max-width: ${size.tablet}) {
    margin-left: 0;
    padding-left: 0.4rem;
  }
`;

const NavRight = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  white-space: nowrap;

  @media screen and (max-width: ${size.tablet}) {
    z-index: 999;
    position: relative;
  }
`;

const LoginButton = styled.a`
  opacity: 0.4;
  border: 1px solid #a3a3a3;
  padding: 0.75rem 1.5rem;
  font-family: Clashdisplay Variable, sans-serif;
  font-weight: 600;
  line-height: 1.25;
  color: var(--white);
  text-transform: uppercase;
  transition: all 0.2s;
  @media screen and (max-width: ${size.mobileL}) {
    padding: .8rem .75rem;
    line-height: 1;
  }
  &:hover {
    opacity: 1;
    color: var(--white);
    background-color: var(--gold);
  }
`;

const NavCenter = styled.div`
  display: flex;
  justify-content: center;
  flex: 1; // Ensures it takes enough space for centering
  position: absolute;
  left: 50%;
  transform: translateX(-50%); // Centering technique
  color: black;
  z-index: 1000;

  @media screen and (max-width: ${size.tablet}) {
    font-size: 14px;
    padding: 0.1rem;
  }
`;

export default function NavBar() {
    const [showNavBar, setShowNavBar] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const navBarTimer = setTimeout(() => {
        setShowNavBar(true);
        }, 50);

        return () => {
        clearTimeout(navBarTimer);
        };
    }, []);

    return (
        <>
        {showNavBar && (
            <Navigation>
            <PaddingGlobal>
                <div className="container-large">
                <Content>
                    <NavLeft>
                    <Boss href="https://icons8.com/icon/11214/businessman" target="_blank" rel="noopener noreferrer">
                        <img 
                        src='https://img.icons8.com/?size=100&id=11214&format=png&color=5E5E5E' 
                        width="40px" 
                        alt='Businessman icon' 
                        className='hover:text-gold' 
                        />
                    </Boss>
                    </NavLeft>
                    <NavRight>
                    <LoginButton className='uppercase'>{t('login')}</LoginButton>
                    </NavRight>
                    <NavCenter>
                    <LanguageSwitcher intro ="intro"/>
                    </NavCenter>
                </Content>
                </div>
            </PaddingGlobal>
            </Navigation>
        )}
        </>
    );
}
