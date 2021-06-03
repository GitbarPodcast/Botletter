import airtable from '../airtable';

describe('airtable persister', () => {
  const request = jest.fn();

  const store = airtable({
    apiKey: '',
    app: '',
    table: '',
    request,
  });

  it('it should to create new entries', async () => {
    request.mockImplementation(() => ({
      records: [
        {
          title: 'eee',
          link: 'http://pippo.it',
          shortText: 'ee',
          image: 'ee',
          sharedBy: 'ee',
          category: 'ARTICLE',
          createdAt: new Date(),
        },
      ],
    }));

    const res = await store.create([
      {
        title: 'eee',
        link: 'http://pippo.it',
        shortText: 'ee',
        image: 'ee',
        sharedBy: 'ee',
        category: 'ARTICLE',
        createdAt: new Date(),
      },
    ]);

    expect(res).toBe(true);
    expect(request).toBeCalled();
  });

  it('it should flag to sent entries entries', async () => {
    request.mockImplementation(() => ({
      records: [
        {
          id: 'id',
          title: 'eee',
          link: 'http://pippo.it',
          shortText: 'ee',
          image: 'ee',
          sharedBy: 'ee',
          category: 'ARTICLE',
          createdAt: new Date(),
        },
      ],
    }));

    const res = await store.setSent(['id']);

    expect(res).toBe(true);
    expect(request).toBeCalled();
  });

  it('it should retrieve entity to send', async () => {
    request.mockImplementation(() => ({
      records: [
        {
          id: 'id',
          fields: {
            title: 'eee',
            link: 'http://pippo.it',
            shortText: 'ee',
            image: 'ee',
            sharedBy: 'ee',
            category: 'ARTICLE',
          },
          createdTime: '2021-06-06T14:04:48.000Z',
        },
        {
          id: 'id',
          fields: {
            title: 'eee',
            link: 'http://pippo.it',
            shortText: 'ee',
            image: 'ee',
            sharedBy: 'ee',
            category: 'ARTICLE',
          },
          createdTime: '2021-06-06T14:04:48.000Z',
        },
      ],
    }));

    const res = await store.getToSend();

    expect(res).toStrictEqual([
      {
        category: 'ARTICLE',
        createdAt: new Date('2021-06-06T14:04:48.000Z'),
        id: 'id',
        image: 'ee',
        link: 'http://pippo.it',
        sharedBy: 'ee',
        shortText: 'ee',
        title: 'eee',
      },
      {
        category: 'ARTICLE',
        createdAt: new Date('2021-06-06T14:04:48.000Z'),
        id: 'id',
        image: 'ee',
        link: 'http://pippo.it',
        sharedBy: 'ee',
        shortText: 'ee',
        title: 'eee',
      },
    ]);
    expect(request).toBeCalled();
  });

  it('it should get by id', async () => {
    request.mockImplementation(() => ({
      id: 'id',
      fields: {
        title: 'eee',
        link: 'http://pippo.it',
        shortText: 'ee',
        image: 'ee',
        sharedBy: 'ee',
        category: 'ARTICLE',
      },
      createdTime: '2021-06-06T14:04:48.000Z',
    }));

    const res = await store.getById('id');

    expect(res).toStrictEqual({
      category: 'ARTICLE',
      createdAt: new Date('2021-06-06T14:04:48.000Z'),
      id: 'id',
      image: 'ee',
      link: 'http://pippo.it',
      sharedBy: 'ee',
      shortText: 'ee',
      title: 'eee',
    });
    expect(request).toBeCalled();
  });
});
