import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 220px;

  background-color: ${({ theme }) => theme.colors.darkgrey};
  margin-top: 2rem;

  @media screen and (max-width: 768px) {
    height: 140px;
  }

  > .github_info {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 14px;
    padding-top: 4px;
    color: #6f7684;
    padding-left: 1rem;
    &:hover {
      color: #cfdcf6;
    }
  }

  > div,
  a {
    max-width: 1220px;
    width: 100%;
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 0.4rem;

    > p {
      margin-top: 2px;
    }

    > svg {
      width: 16px;
      height: 16px;
    }
  }
`;
