import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BoatImage } from '@/assets/images';
import { TagColor } from '@/types/enums';
import SmallItemCard from './SmallItemCard';
import InfoButton from './InfoButton';

const tag = {
  label: 'tag label',
  color: TagColor.RED,
};
const image = BoatImage;
const onClick = jest.fn();

describe('SmallItemCard', () => {
  test('renders props on card', () => {
    render(
      <SmallItemCard
        tag={tag}
        image={image}
        alt='alt'
        title='title'
        subTitle='subTitle'
        onClick={onClick}
        bottomComponent={<InfoButton />}
        isHighlighted
        smallView={false}
      />
    );
    expect(screen.queryByText('tag label')).toBeInTheDocument();
    expect(screen.queryByText('title')).toBeInTheDocument();
    expect(screen.queryByText('subTitle')).toBeInTheDocument();
  });

  test('on click function called', () => {
    render(
      <SmallItemCard
        tag={tag}
        image={image}
        alt='alt'
        title='title'
        subTitle='subTitle'
        onClick={onClick}
        bottomComponent={<InfoButton />}
        isHighlighted
        smallView={false}
      />
    );
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      button.click();
    });
    expect(onClick).toHaveCalled();
  });
});
