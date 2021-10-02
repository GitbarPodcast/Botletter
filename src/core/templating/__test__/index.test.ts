import renderer from '..';
import index from '../../../assets/htmlTemplate';

describe('templating', () => {
  it('it should render the template', async () => {
    const html = renderer(
      {
        articles: [],
        episode: { title: 'titolo', description: 'desc', image: 'image url', link: 'link_url' },
      },
      index as React.FC,
    );
    expect(html).toMatchSnapshot();
  });
});
