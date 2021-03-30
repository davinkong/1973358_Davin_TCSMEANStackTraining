import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../services/quiz.model';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizzes:Quiz[] = [];
  currentQuiz = 0;
  answer: Array<Quiz> = [];
  question: Array<Quiz> = [];
  answerSelected = false;
  correctAnswers = 0;
  incorrectAnswers = 0;
  msg:string = " "
  ans1:string = " "
  ans2:string = " "
  ans3:string = " "
  ans4:string = " "

  result = false;
  correct :Array<String>=[];
constructor(private quizService:QuizService){}

  ngOnInit() {
    this.quizzes = this.quizService.getQuizzes();
    // this.question = JSON.parse(sessionStorage.getItem("question"));
  }
  onAnswer(option : boolean){
    this.answerSelected = true;
    setTimeout(() => {
      this.currentQuiz++;
      this.answerSelected = false;
    }, 1000);
    
    if(option){
      this.correctAnswers++;
      console.log("correct!"+ this.correctAnswers)
    }else{
      this.incorrectAnswers++;
      console.log("incorrect: "+ this.incorrectAnswers)
    }
  }

  displayResult(){
    this.result = true;
    let color:string = "red"
    
    if(this.correctAnswers>=3){
      color = "green"
      this.msg = "PASS!"
      this.answer = this.quizService.quizzes
      this.ans1 = "5+5 = 10"
      this.ans2 = "5*5 = 25"
      this.ans3 = "5-5 = 0"
      this.ans4 = "5/5 = 1"
    }else{
      this.msg = "Fail!"
      this.ans1 = "5+5 = 10"
      this.ans2 = "5*5 = 25"
      this.ans3 = "5-5 = 0"
      this.ans4 = "5/5 = 1"
    }
    return color;


    
  }
    
 
}
