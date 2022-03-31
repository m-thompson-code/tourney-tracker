import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';

interface Player {
  username: string;
  slackUsername: string;
}

interface Match {
  playerA: Player;
  playerB: Player;
  started: boolean;
  playerAWins: number;
  playerBWins: number;
}

type MatchFormGroup = FormGroup<{
  playerA: FormControl<string>;
  playerB: FormControl<string>;
  started: FormControl<boolean>;
  playerAWins: FormControl<number>;
  playerBWins: FormControl<number>;
  edit: FormControl<boolean>;
}>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tourney-tracker';

  eta = 5 + 3 * 4;

  form = new FormGroup({
    entries: new FormControl(0, { initialValueIsDefault: true }),
    matches: new FormArray<MatchFormGroup[]>([]),
  });

  endTimeEst$: Observable<number>;

  temp = this.getMatchFormGroup();

  constructor() {
    this.endTimeEst$ = this.form.valueChanges.pipe(
      map(v => {
        return (v.entries ?? 0) * this.eta;
      })
    );
  }

  getMatchFormGroup(): MatchFormGroup {
    return new FormGroup({
      playerA: new FormControl("", { initialValueIsDefault: true }),
      playerB: new FormControl("", { initialValueIsDefault: true }),
      started: new FormControl(false, { initialValueIsDefault: true }),
      playerAWins: new FormControl(0, { initialValueIsDefault: true }),
      playerBWins: new FormControl(0, { initialValueIsDefault: true }),
    });
  }


}
