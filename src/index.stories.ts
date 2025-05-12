import type { Meta, StoryObj } from '@storybook/html';
import {default as LissajousLoader, type Props} from './index';

type Args = Pick<Props, 'xFrequency' | 'yFrequency' | 'colour'> & {
    deltaPiDivider: number,
    canvasSize: number,
};

const meta: Meta<Args> = {
  title: 'LissajousLoader',
};

export default meta;
type Story = StoryObj<Args>;

export const Index: Story = {
  render: ({canvasSize, xFrequency, yFrequency, deltaPiDivider, colour}) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
    const loader = new LissajousLoader(canvas, {
        xFrequency,
        yFrequency,
        delta: Math.PI / deltaPiDivider,
        colour,
    });

    loader.start();

    return canvas;
  },
  args: {
    xFrequency: 3,
    yFrequency: 2,
    deltaPiDivider: 2,
    colour: '#0077ff',
    canvasSize: 64
  },
  argTypes: {
    canvasSize: {control: {type: 'number', min: 16}},
    xFrequency: {control: {type: 'number'}},
    yFrequency: {control: {type: 'number'}},
    deltaPiDivider: {control: {type: 'number', min: 0}},
    colour: { control: { type: 'color', presetColors: ['black', 'white', '#BADA55']} },
  },
};