import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  height: 44px;
  background-color: ${({ theme }) => theme.colors.bluegrey};
  border-top: 1px solid ${({ theme }) => theme.colors.blue};
  > div {
    letter-spacing: -0.03em;
    color: ${({ theme }) => theme.colors.blackgrey};
    font-size: 15px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;

    &:nth-child(1) {
      width: 14%;
    }
    &:nth-child(2) {
      width: 29%;
    }
    &:nth-child(3) {
      width: 17%;
    }
    &:nth-child(4) {
      width: 11%;
    }
    &:nth-child(5) {
      width: 16%;
    }
    &:nth-child(6) {
      width: 12%;
    }
  }
`;
