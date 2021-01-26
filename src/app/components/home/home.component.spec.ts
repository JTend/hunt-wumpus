import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";
import { HomeComponent } from "./home.component";
import { reducers } from "../../store";
import { AppRoutingModule } from "src/app/app-routing.module";
import { FormsModule } from "@angular/forms";

let component : HomeComponent;
let fixture : ComponentFixture<HomeComponent>;

describe('HomeComponent', () => {
  beforeEach( async () => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      imports: [
        StoreModule.forRoot(reducers),
        AppRoutingModule,
        FormsModule
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });
  it('Should be an instance of HomeComponent', () => {
    expect(component).toBeInstanceOf(HomeComponent);
    expect(component).toBeTruthy();
  });
  it('Should have 4 inputs', () => {
    let inputs = fixture.nativeElement.querySelectorAll('input');
    expect(inputs.length).toBe(4);
  });
  it('should have button Start game', () => {
    let button = fixture.nativeElement.querySelector('section > form > button');
    expect(button.textContent).toBe('Start game');
  });
  it('Should start new game', () => {
    spyOn(component, 'iniciarPartida').and.callThrough();
    let button : HTMLButtonElement = fixture.nativeElement.querySelector('section > form > button');
    button.click();
    expect(component.iniciarPartida).toHaveBeenCalled();
  });
});