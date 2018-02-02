import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Foo from '../src/Foo.vue';

describe('Foo', function () {
  let wrp;

  const routes = [
    { path: '/items', name: 'items' },
    { path: '/items/new', name: 'item-new' },
    { path: '/items/:item_id/edit', name: 'item-edit' }
  ];

  const router = new VueRouter({ routes });

  beforeEach(() => {

    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuetify);

    wrp = mount(Foo, {
      localVue: localVue,
      router,
    });
  });

  it('does not display element if there are no items', () => {
    // No items to display.
    // NOTE: By default, our component has some items, but we use
    // setData() here to override it with an empty array of tiems to
    // make sure we have not items at all and our test works as
    // expected.
    wrp.setData({ items: [] });
    expect(wrp.find('.item-index-row').exists()).toBe(false);
  });

  it('displays .item-index-row when there are items', () => {
    // Some items to display.
    // NOTE: By default our component has some items, but we use
    // setData() here providing an array with at least one item so
    // we can be sure we have items and therefore our UI _should_
    // indeed display that .item-index-row element.
    wrp.setData({ items: [{ id: 1, name: 'My Item' }] });
    expect(wrp.find('.item-index-row').exists()).toBe(true);

    // And we also expect to see the text 'My Item' in there.
    expect(wrp.find('.item-index-row').html()).toMatch(/My Item/);
  });

  it('displays N rows when there are N items', () => {
    wrp.setData({
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
      ]
    });

    // findAll returns an array, and an array has the length property.
    expect(wrp.findAll('.item-index-row').length).toBe(3);
  });

  it('should render btn as anchor tag with proper edit url', () => {

    // Not using setData() here. Just assume we have some items in
    // the component (our example component does indeed have two
    // default items).  This may or may not be a good approach. It
    // varies from component to component and from project to
    // project. Assess your own situation and decide for yourself.

    let btn = wrp.find('.btn-edit');

    // Each item displayed should have an edit link. Our component
    // uses <v-btn> with the `:to` attribute. That makes it an <a>
    // tag, a link.
    expect(btn.exists()).toBe(true);
    expect(btn.is('a')).toBe(true);

    // And it should route to /items/<id>/edit url.
    expect(btn.element.href).toMatch(/items\/\d+\/edit/);
  });

  it('should have a happy ending', () => {
    // You should see all Vuetify components properly rendered
    // as normal HTML tags. For example, <v-flex> should be
    // rendered as <div class="v-flex ...">
    expect(wrp.contains('div.flex')).toBe(true);

    // Just so that you can visually inspect the rendered html.
    console.log(wrp.find('.item-index-row').html());
  });
});
