import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
    name: 'timeAgo',
    standalone: true // Add this line to make it a standalone pipe
})
export class TimeAgoPipe implements PipeTransform {
    transform(value: Date | string): string {
        return formatDistanceToNow(new Date(value), { addSuffix: true });
    }
}