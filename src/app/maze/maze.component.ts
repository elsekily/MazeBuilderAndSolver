import { Component } from '@angular/core';
import { State } from 'src/models/state';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css']
})
export class MazeComponent {
  protected grid: number[][] =
    [
      [-1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 0, 0, 1, 0, 1, 0, 1, -2],
    ];
  start: number[] = [10, 10];
  end: number[] = [0, 0];
  public state: State = State.ready;

  getBackgroundColor(cellValue: number): string {
    let color: string = '';
    switch (cellValue) {
      case 0:
        color = 'white';
        break;
      case 1:
        color = 'black';
        break;
      case 2:
        color = 'green';
        break;
      case 3:
        color = 'red';
        break;
      case -1:
        color = 'pink';
        break;
      case -2:
        color = 'blue';
        break;
    }
    return color;
  }

  public onCellClick(i: number, j: number): void {
    if (this.state != State.ready)
      return;

    if ((i == this.start[0] && j == this.start[1]) || (i == this.end[0] && j == this.end[1]))
      return;

    this.grid[i][j] = this.grid[i][j] == 0 ? 1 : 0;
  }

  public async Solve(): Promise<void> {

    this.state = State.started;
    await this.recursion(this.start[0], this.start[1]);
    this.state = State.finished;


    if (!this.solved) {
      alert('No Solution');
    }


  }
  solved: boolean = false;
  private async recursion(i: number, j: number): Promise<void> {
    if (this.solved)
      return;

    if (i >= this.grid.length || i < 0 || j >= this.grid[0].length || j < 0)
      return;

    if (this.grid[i][j] == 1 || this.grid[i][j] == 2 || this.grid[i][j] == 3)
      return;


    if (i == this.end[0] && j == this.end[1]) {
      this.solved = true;
      return;
    }


    this.grid[i][j] = 2;

    await this.delay(100); // 2 seconds delay


    await this.recursion(i + 1, j);
    await this.recursion(i - 1, j);
    await this.recursion(i, j + 1);
    await this.recursion(i, j - 1);

    if (!this.solved) {
      await this.delay(50); // 2 seconds delay
      this.grid[i][j] = 3;
    }
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  Reset() {
    this.grid =
      [
        [-1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 0, 1, 0, 1, -2],
      ];
    this.state = State.ready;
    this.solved = false;
  }
}