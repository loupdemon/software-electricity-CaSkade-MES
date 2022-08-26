import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { BpmnDataModel, BpmnProperty } from '../../../BpmnDataModel';
import { BpmnExtensionElementService } from '../../bpmn-extension-element.service';

@Component({
    selector: 'base-task-form',
    templateUrl: './base-task-form.component.html',
    styleUrls: ['./base-task-form.component.scss']
})
export class BaseTaskFormComponent implements OnInit, OnChanges {

    @Input() bpmnElement;
    @Input() dataModel: BpmnDataModel;

    fg: FormGroup<{
        id: FormControl<string>;
        type: FormControl<string>;
        name: FormControl<string>;
    }>;

    constructor(
        private extensionService: BpmnExtensionElementService,
    ) {}


    ngOnChanges(changes: SimpleChanges): void {
        this.fg?.patchValue({
            id: this.bpmnElement?.id,
            type: this.bpmnElement?.type,
            name: this.bpmnElement?.businessObject.name
        });
    }

    ngOnInit() {
        this.fg = new FormGroup({
            id: new FormControl(this.bpmnElement?.id),
            type: new FormControl({value: this.bpmnElement?.type, disabled: true}),
            name: new FormControl(this.bpmnElement?.businessObject.name)
        });
        this.fg.valueChanges.pipe(debounceTime(100)).subscribe(change => {
            Object.keys(change).forEach(changeKey => {
                const prop = new BpmnProperty(changeKey, change[changeKey]);
                this.extensionService.updateBaseProperty(prop);
            });
        });
    }

}
