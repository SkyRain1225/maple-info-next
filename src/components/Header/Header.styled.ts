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
