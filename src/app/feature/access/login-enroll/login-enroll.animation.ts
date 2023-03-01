import { trigger, state, style, transition, animate, animation } from '@angular/animations';
export const LoginEnrollAnimation = animation ([
  trigger('spielWrapperState', [
    state('right', style({
      opacity: 1,
      transform : 'translateX(-470px)',
      'border-radius' : '20px 0 0 20px',
      'z-index' : '10'
    })),
    transition('left <=> right', animate(500)),
  ]),

  trigger('formWrapperState', [
    state('left', style({
      transform : 'translateX(300px)',
      'border-radius' : '0px 20px 20px 0px',
      'z-index' : '10'
    })),
    transition('left <=> right', animate(500))
  ]),

  trigger('wrapperState', [
    state('false', style({
      opacity: 1,
      transform: 'translateY(10px)'
    })),
    transition('void <=> *', [
      style({
        opacity: 0,
        transform: 'translateY(-10px)'
      }),
      animate(1000)
    ])
  ])
]);
