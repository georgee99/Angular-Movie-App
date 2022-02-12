import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;

  const createComponent = createComponentFactory({
    component: HeaderComponent,
  });

  it('should render a specific title name', ()=> {
    spectator = createComponent();
    expect('#title').toHaveText('Geek Flix Movie App');
  })
});
