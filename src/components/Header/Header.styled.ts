import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1180px;
  width: 100%;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0 20px 0 20px;

  > .left_content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    > .title {
      font-size: 14px;
      font-weight: bold;
      color: #f68500;
      padding-top: 1.6rem;
    }
    @media screen and (max-width: 768px) {
      gap: 0.2rem;
      > .title {
        font-size: 11px;
      }
    }
    @media screen and (max-width: 491px) {
      gap: 0rem;
      > .title {
        font-size: 9px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .logo_img {
      width: 100px;
      height: 48px;
    }
  }

  > .right_content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 6px;
    font-size: 14px;
    font-weight: 400;

    > .update_time {
      font-size: 12px;
    }

    @media screen and (max-width: 768px) {
      font-size: 12px;

      > .update_time {
        font-size: 10px;
      }
    }
  }
`;
