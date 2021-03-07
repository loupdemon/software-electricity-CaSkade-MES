import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {MtpMappingServiceConfig} from '@shared/models/mappings/MtpMappingServiceConfig';

@Injectable({
    providedIn: 'root'
})
export class MtpMappingService {

    baseApiRoute = '/api/mappings/mtp';

    constructor(
        private httpClient: HttpClient
    ) { }


    /**
	 * Change the URL of the MTP mapping webservice
	 * @param newUrl New URL of the mto mapping service
	 */
    changeUrl(newUrl: string): Observable<string> {
        return this.httpClient.put(`${this.baseApiRoute}/config`, {url: newUrl}) as Observable<string>;
    }


    /**
	 * Get the current URL of the MTP mapping service
	 * @returns Current URL of the MTP mapping service
	 */
    getConfig(): Observable<MtpMappingServiceConfig> {
        return this.httpClient.get(`${this.baseApiRoute}/config`) as Observable<MtpMappingServiceConfig>;
    }


    /**
	 * Execute a mapping
	 * @param mtpFile MTP file that will be mapped
	 * @returns The mapped module with skills in turtle syntax
	 */
    executeMapping(mtpFile): Observable<string> {
        return this.httpClient.post(this.baseApiRoute, mtpFile) as Observable<string>;
    }

}
