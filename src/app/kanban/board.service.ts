import {Injectable} from '@angular/core';
import {Board, Task} from './board.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
  }

  /**
   * Creates a new board for the current user
   */
  async createBoard(data: Board): Promise<DocumentReference> {
    const user = await this.afAuth.currentUser;
    return this.db.collection('boards').add({
      ...data,
      uid: user.uid,
      tasks: [{description: 'Hello!', label: 'yellow'}]
    });
  }

  /**
   * Delete board
   */
  async deleteBoard(boardId: string): Promise<void> {
    await this.db
      .collection('boards')
      .doc(boardId)
      .delete();
  }

  /**
   * Updates the tasks on board
   */
  async updateTasks(boardId: string, tasks: Task[]): Promise<void> {
    await this.db
      .collection('boards')
      .doc(boardId)
      .update({tasks});
  }

  /**
   * Remove a specifc task from the board
   */
  async removeTask(boardId: string, task: Task): Promise<void> {
    return this.db
      .collection('boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task)
      });
  }

  /**
   * Get all boards owned by current user
   */
  // TODO figure out typings here
  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db
            .collection<Board>('boards', ref =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({idField: 'id'});
        } else {
          return [];
        }
      })
    );
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  async sortBoards(boards: Board[]): Promise<void> {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map(b => db.collection('boards').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, {priority: idx}));
    await batch.commit();
  }
}
