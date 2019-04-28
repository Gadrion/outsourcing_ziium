import React from 'react';
import { IconButton } from 'wisenet-ui/components/atoms';
import { Slider } from 'wisenet-ui/components/molecules';
import {
  WrapperStyled,
  SectionStyled,
  TitleStyled,
  VerticalWrapperStyled,
} from './SliderExamplePageStyled';

const SliderExamplePage = () => (
  <WrapperStyled>
    <SectionStyled>
      <TitleStyled>Basic</TitleStyled>
      <Slider
        min={0}
        max={100}
        defaultValue={50}
      />
    </SectionStyled>
    <SectionStyled>
      <TitleStyled>Disabled</TitleStyled>
      <Slider
        min={0}
        max={100}
        defaultValue={50}
        disabled
      />
    </SectionStyled>
    <SectionStyled>
      <TitleStyled>With Buttons</TitleStyled>
      <Slider
        min={0}
        max={100}
        defaultValue={50}
        leftButton={(
          <IconButton onClick={() => console.log('Button Click')}>
            <i className="tui tui-wn5-ptz-minus" />
          </IconButton>
        )}
        rightButton={(
          <IconButton onClick={() => console.log('Button Click')}>
            <i className="tui tui-wn5-ptz-plus" />
          </IconButton>
        )}
      />
      <br />
      <br />
      <Slider
        min={0}
        max={100}
        defaultValue={50}
        leftButton={(
          <IconButton onClick={() => console.log('Button Click')}>
            <i className="tui tui-wn5-ptz-near" />
          </IconButton>
        )}
        rightButton={(
          <IconButton onClick={() => console.log('Button Click')}>
            <i className="tui tui-wn5-ptz-far" />
          </IconButton>
        )}
      />
    </SectionStyled>
    <SectionStyled>
      <TitleStyled>Vertical</TitleStyled>
      <VerticalWrapperStyled>
        <Slider
          vertical
          min={0}
          max={100}
          defaultValue={50}
          topButton={(
            <IconButton border onClick={() => console.log('Button Click')}>
              <i className="tui tui-wn5-add" />
            </IconButton>
          )}
          bottomButton={(
            <IconButton border onClick={() => console.log('Button Click')}>
              <i className="tui tui-wn5-minus" />
            </IconButton>
          )}
        />
      </VerticalWrapperStyled>
    </SectionStyled>
  </WrapperStyled>
);

export default SliderExamplePage;
