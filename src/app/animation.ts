import { trigger, animate, transition, style, query } from '@angular/animations';

export const fadeInOutAnimation =
    trigger('routeAnimations', [
        transition('* <=> *', [
            query(':enter', [
                style({ opacity: 0 }),
                animate('0.5s ease-out', style({ opacity: 1 }))
            ], { optional: true }),
            query(':leave', [
                animate('0.5s ease-out', style({ opacity: 0 }))
            ], { optional: true })
        ])
    ]);