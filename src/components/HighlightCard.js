import React from "react";
import { HighlightCardWrapper, HighlightCardBanner, HighlightCardBody, HighlightTitle } from './mainComponents'


const HighlightCard = ({ banner, title, friendName }) => {
    return (
      <HighlightCardWrapper>
          <HighlightCardBanner><p>{banner}</p></HighlightCardBanner>
          <HighlightCardBody>
            <p>{`You and ${friendName}`}</p>
            <HighlightTitle>{title}</HighlightTitle>
          </HighlightCardBody>
      </HighlightCardWrapper>
    );
  };

export default HighlightCard