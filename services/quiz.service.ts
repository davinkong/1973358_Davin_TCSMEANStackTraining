import { Injectable } from '@angular/core';
import { Quiz } from './quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  [x: string]: any;
 quizzes: Quiz[] = [
  
 {
   question:"What is 5+5?",
   answer: [
      {option: "10", correct: true},
      {option: "25", correct: false},
      {option: "0", correct: false},
      {option: "1", correct: false}
     
   ]
 },
 {
  question:"What is 5*5?",
  answer: [
     {option: "10", correct: false},
     {option: "25", correct: true},
     {option: "0", correct: false},
     {option: "1", correct: false}
    
  ]
},
{
  question:"What is 5-5?",
  answer: [
     {option: "10", correct: false},
     {option: "25", correct: false},
     {option: "0", correct: true},
     {option: "1", correct: false}
    
  ]
},
{
  question:"What is 5/5?",
   answer: [
      {option: "10", correct: false},
      {option: "25", correct: false},
      {option: "0", correct: false},
      {option: "1", correct: true}
     
   ]
}
]
constructor(){}
getQuizzes(){
  return this.quizzes;
}

}
