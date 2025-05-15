package com.srikanth.practise.java;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class JavaApplicationTests {

	@Test
	void contextLoads() {
	}

	public VersionResponseDTOV1 transformToV1(VersionResponseDTO originalDto) {
        List<VersionResponseV1> v1Documents = originalDto.getDocuments().stream()
            .map(this::transformDocument)
            .collect(Collectors.toList());

        VersionResponseDTOV1 v1Dto = new VersionResponseDTOV1();
        v1Dto.setDocuments(v1Documents);
        return v1Dto;
    }

    private VersionResponseV1 transformDocument(VersionResponse original) {
        VersionResponseV1 v1 = new VersionResponseV1();
        v1.setCollectionType(original.getCollectionType());
        v1.setCreationDate(original.getCreationDate());
        v1.setStatus(original.getStatus());
        v1.setSotDocumentVersion(original.getSotDocumentVersion());
        v1.setHoldingDocumentVersion(original.getHoldingDocumentVersion());
        v1.setErrorCount(original.getErrorCount());

        HeaderRequestDTO oldHeader = original.getHeaderRequestData();
        HeaderRequestDTOV1 newHeader = new HeaderRequestDTOV1();
        newHeader.setClientDocumentId(oldHeader.getAssociationHoldingId());
        newHeader.setClientDocumentVersion(String.valueOf(oldHeader.getClientSOTVersion()));
        newHeader.setPlanDocumentId(oldHeader.getPlanSOTId());
        newHeader.setPlanDocumentVersion(String.valueOf(oldHeader.getPlanSOTVersion()));

        v1.setHeaderRequestData(newHeader);

        return v1;
    }

}
