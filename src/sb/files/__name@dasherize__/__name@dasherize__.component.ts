import { Component } from '@angular/core';

@Component({
  selector:    'mlp-<%= dasherize(name)%>',
  templateUrl: './<%= dasherize(name)%>.component.html',
  styleUrls: ['./<%= dasherize(name)%>.component.scss'],
})
export class <%= classify(name)%>Component {
  constructor() {}
}