import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";
import { reducers } from "../../store";
import { AppRoutingModule } from "src/app/app-routing.module";
import { WumpusComponent } from "./wumpus.component";

let fixture : ComponentFixture<WumpusComponent>;
let component : WumpusComponent;

describe('WumpusComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        WumpusComponent
      ],
      imports: [
        StoreModule.forRoot(reducers),
        AppRoutingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WumpusComponent);
    component = fixture.componentInstance;
  });
  it('Should be an instance of WumpusComponent', () => {
    expect(component).toBeInstanceOf(WumpusComponent);
  });
  it('should have one section', () => {
    let section = fixture.nativeElement.querySelectorAll('section');
    expect(section).toBeDefined();
    expect(section.length).toBe(1);
  });
  it('Section should have 3 div childs after loading store', () => {
    component.ngOnInit();
    fixture.detectChanges();
    let divs = fixture.nativeElement.querySelectorAll('section > div');
    expect(divs.length).toBe(3);
  });
  it('should have div.hunter to play with 4 buttons', () => {
    fixture.detectChanges();
    let divHunter = fixture.nativeElement.querySelectorAll('div.hunter');
    let buttons = fixture.nativeElement.querySelectorAll('button');
    expect(divHunter).toBeDefined();
    expect(buttons.length).toBe(4);
  })
});