import React from "react";
import Button from "@atlaskit/button";
import styles, { css } from "styled-components";
import CheckIcon from "@atlaskit/icon/glyph/check";

const ButtonStyles = styles(Button)`
    margin-top: 5px;
    text-align: left;
    &, &:hover {
        ${(p) =>
          p.isCompleted &&
          css`
            text-decoration: line-through;
          `}
    }

    &:hover {
        .check-icon {
            display: inline-block;
        }
    }

    .check-icon {
        display: none;
        &:hover {
            background-color: #e2e2e2;
            boder-radius: 3px;
        }
    }
`;

export default function Todo({ todo, handleCheckBtnClick }) {
  return (
    <div>
      <ButtonStyles
        isCompleted={todo.isCompleted}
        onClick={() => {
          handleCheckBtnClick(todo.id);
        }}
        shouldFitContainer
        iconAfter={
          !todo.isCompleted && (
            <span className="check-icon">
              <CheckIcon primaryColor="#4fff4f" />
            </span>
          )
        }
      >
        {todo.name}
      </ButtonStyles>
    </div>
  );
}
