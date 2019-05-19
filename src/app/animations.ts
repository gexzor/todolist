import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('* <=> *', [
            style({ position: 'relative' }),
            query(':enter, :leave',
                [
                    style({
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                    }),
                ],
                { optional: true },
            ),
            // query(':enter', [style({ left: '-100%', opacity: 0 })], { optional: true }),
            // query(':leave', animateChild(), { optional: true }),
            group([
                query(':leave',
                    [
                        style({ left: '0%', opacity: 1 }),
                        animate('1500ms ease-out', style({ left: '100%', opacity: 0 })),
                    ],
                    { optional: true },
                ),
                query(':enter',
                    [
                        style({ left: '-100%', opacity: 0 }),
                        animate('2500ms ease-out', style({ left: '0%', opacity: 1 })),
                    ],
                    { optional: true },
                ),
            ]),
            query(':enter', animateChild(), { optional: true }),
        ]),
    ]);