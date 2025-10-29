import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-student',
  imports: [],
  templateUrl: './student.html',
  styleUrl: './student.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Student {

}
