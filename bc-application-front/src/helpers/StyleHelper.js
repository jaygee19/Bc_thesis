export function getTypeInSlovak(type) {
    switch (type) {
        case 'first_check':
            return 'prvý zápočet';
        case 'second_check':
            return 'druhý zápočet';
        case 'semester_work':
            return 'semestrálna práca';
        default:
            return 'domáca úloha';
    }
}

export function getMaxNumberOfPoints(type) {
    switch (type) {
        case 'first_check':
            return '10';
        case 'second_check':
            return '30';
        case 'semester_work':
            return '50';
        default:
            return '10';
    }
}
