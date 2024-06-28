import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router } from '@angular/router';
import { ModelControllerService } from '../../../../shared/services/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-model-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './edit-model-form.component.html',
  styleUrl: './edit-model-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditModelFormComponent implements OnInit {
  @Input() modelId!: number;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modelsService: ModelControllerService,
    private change: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getModel();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      color: ['', [Validators.required]],
    });
  }

  getModel() {
    this.modelsService.getModelById({ id: this.modelId }).subscribe((model) => {
      this.form.patchValue({
        name: model.name,
        color: model.color,
      });
    });
  }

  edit() {
    this.modelsService
      .updateModel({
        updateModelRequest: {
          id: this.modelId,
          name: this.form.value.name,
          color: this.form.value.color,
        },
      })
      .subscribe({
        complete: () => {
          this.toastr.success('Model updated successfully', 'Success');
          this.change.markForCheck();

          setTimeout(() => {
            this.router.navigate(['/management', 'models']);
          }, 2000);
        },
      });
  }

  onFormSubmit() {
    if (this.form.invalid) {
      this.toastr.warning('Please fill the form correctly', 'Warning');
      return;
    }

    this.edit();
  }
}
