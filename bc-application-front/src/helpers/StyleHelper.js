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